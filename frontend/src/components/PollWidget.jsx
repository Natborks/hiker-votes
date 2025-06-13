function PollWidget({ question, children }) {
  return (
    <section aria-labelledby="vote-question">
      <header>
        <h2 id="vote-question">{question}</h2>
      </header>
      {children}
    </section>
  );
}

export default PollWidget;
