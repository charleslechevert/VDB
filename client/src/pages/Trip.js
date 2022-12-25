import  { Tripform } from "../components/Tripform"
import  { Triplist } from "../components/Triplist"
import  { Navbar } from "../components/Navbar"

export function Trip() {
    return(
        <div>
            <Navbar />
            <Tripform title="Ajouter" />
            <Triplist/>
        </div>
        
    )
}