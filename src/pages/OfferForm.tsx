import  { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { OfferService } from '../services/offer.service'
import Offer from '../models/Offer'
import { useNavigate, useParams } from 'react-router-dom'
import { Temporal } from 'temporal-polyfill'

function OfferForm() {
    const now = Temporal.Now.plainDateISO()
    const threeMonthLater = now.add({ months: 3 }).toString().slice(0, 16)
    const [form, setForm] = useState<Partial<Offer>>({
        title: '',
        description: '',
        active: true,
        contactEmail: '',
        location: '',
        published: new Date().toISOString().slice(0, 16),
        expired: threeMonthLater,
        idCategory: undefined
    })

    const { id } = useParams()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {
        if (id) {
            setLoading(true)
            OfferService.getById(Number(id))
                .then(data => setForm({
                    ...data,
                    published: new Date(form.published || '').toISOString().slice(0, 16),
                    expired: new Date(form.published || '').toISOString().slice(0, 16)
                }))
                .catch((error) => setError(error.message))
                .finally(() => setLoading(false))
        }
    }, [id])


    const handleSubmit = (e: FormEvent) => {
        try {
            setLoading(true)
            setError(null)
            e.preventDefault()
            const formData = {
                ...form,
                published: new Date(form.published || '').toISOString(),
                expired: new Date(form.published || '').toISOString()
            }
            if (id) OfferService.update(Number(id), formData)
            else OfferService.create(formData)

            navigate('/offers')
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked, name } = e.target
        setForm({ ...form, [name]: checked })
    }

    if (loading) return <p>Loading...</p>

    return (
        <div className='text-white flex flex-col'>
            <h1>Insercion de nueva oferta</h1>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                {error && <p>{error}</p>}
                <label>
                    Titulo:
                    <input name='title' value={form.title} onChange={handleChange} required />
                </label>

                <label>
                    Descripcion:
                    <input name='description' value={form.description} onChange={handleChange} required />
                </label>

                <label>
                    Email de contacto:
                    <input name='contactEmail' value={form.contactEmail} onChange={handleChange} required />
                </label>

                <label>
                    Localización:
                    <input name='location' value={form.location} onChange={handleChange} required />
                </label>

                <label>
                    Fecha publicación:
                    <input type='datetime-local' name='published' value={form.published} onChange={handleChange} required />
                </label>

                <label>
                    Fecha fin de publicación:
                    <input type='datetime-local' name='expired' value={form.expired} onChange={handleChange} required />
                </label>

                <label>
                    Activa:
                    <input type='checkbox' name='active' value={form.expired} onChange={handleChangeCheckbox} required />
                </label>


                <input type="datetime-local" value={form.published} />
                <button>Guardar</button>
            </form>
        </div>
    )
}


export default OfferForm