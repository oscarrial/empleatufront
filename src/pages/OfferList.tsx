import { useEffect, useState } from 'react'
import Offer from '../models/Offer'
import { OfferService } from '../services/offer.service'
import { Link } from 'react-router-dom'

export default function OfferList() {
    const [offers, setOffers] = useState<Offer[]>()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        OfferService.getAll()
                .then(setOffers)
                .catch((error)=>setError(error.message))
                .finally(()=>setLoading(false))
    }, [])
    return (
        <div>
        <h1>OfferList</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {offers?.length === 0}
        {offers?.map(offer =>
            <div key={offer.id}>
            {offer.title}
            <Link to={`/offers/${offer.id}`}>Ver</Link>
            <Link to={`/offers/edit${offer.id}`}>Editar</Link>
            </div>
        )}
        </div>
    )
}
