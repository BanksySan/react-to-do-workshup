export default function TaskCard({title, description}) {
    return <section className="task-card">
        <h1>{title}</h1>
        <p>{description}</p>
    </section>
}