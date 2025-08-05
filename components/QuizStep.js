export default function QuizStep({ step, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const value = e.target.elements[0].value
    onNext(value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-md mx-auto">
      <label className="text-lg font-semibold">{step.question}</label>
      {step.type === "select" ? (
        <select className="border p-2 rounded">
          {step.options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input type={step.type} className="border p-2 rounded" required={step.question.includes("optional") ? false : true} />
      )}
      <button type="submit" className="bg-accent text-white py-2 px-4 rounded">Weiter</button>
    </form>
  )
}