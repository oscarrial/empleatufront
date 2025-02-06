import Offer from "../models/Offer"
import { fetchAPI } from "../utils/FetchAPI"
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

export class OfferService {
    static async getAll() {
        return await fetchAPI(API_URL_BASE+'/offers')
    }

    static async getById(id:number) {
        return await fetchAPI(API_URL_BASE+'/offers/'+id)
    }

    static async create(offer: Partial<Offer>) {
        return await fetchAPI(API_URL_BASE+'/offers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(offer),
            credentials: 'include'
        })
    }

    static async update(id:number, offer: Partial<Offer>) {
        return await fetchAPI(API_URL_BASE+'/offers/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(offer),
            credentials: 'include'
        })
    }



}