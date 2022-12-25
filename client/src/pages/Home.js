import  { Navbar } from "../components/Navbar"

export function Home() {
    return (
        <div>
            <Navbar />
            <section>
                <a href="/trip" className="home__option-container">Ajouter une traversée</a>
                <a href="/trip" className="home__option-container">Historique</a>
                <a href="/trip" className="home__option-container">Importer les données</a>
                <a href="/trip" className="home__option-container">Gérer les utilisateurs</a>
            </section>
        </div>
    )
}