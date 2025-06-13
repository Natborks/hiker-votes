
resource "aws_ecs_cluster" "hiker-votes" {
  name = "hiker-votes-cluster"
}


resource "aws_ecs_service" "hiker-votes-service" {
  name            = "hiker-votes-service"
  cluster         = aws_ecs_cluster.hiker-votes.id
  task_definition = aws_ecs_task_definition.hiker-votes-task_definition.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = [aws_subnet.public_1.id, aws_subnet.public_2.id]
    security_groups = [aws_security_group.ecs_service_sg.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.hiker-votes-tg.arn
    container_name   = "frontend"
    container_port   = 80
  }
}

resource "aws_ecs_task_definition" "hiker-votes-task_definition" {
  family                   = "service"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "1024"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name      = "frontend"
      image     = var.frontend_image_uri
      essential = true
      portMappings = [
        {
          containerPort = 8080
          protocol      = "tcp"
        }
      ]
    },
    {
      name      = "backend"
      image     = var.backend_image_uri
      essential = true
      portMappings = [
        {
          containerPort = 80
          protocol      = "tcp"
        }
      ]
    }
  ])
}
