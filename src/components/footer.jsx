import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFacebook, FiInstagram, FiX } from 'react-icons/fi'
import axios from 'axios'

const Footer = () => {
  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    number:'',
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Wysyłanie...')
  
    try {
      const res = await axios.post('http://localhost:5001/send', formData)
      if (res.data.success) {
        setStatus('Wiadomość wysłana!')
        setFormData({ name: '', email: '', message: '',number:'' })
        setTimeout(() => setShowForm(false), 2000) // automatycznie zamknij po 2 sek.
      } else {
        setStatus('Coś poszło nie tak.')
        console.error("Błąd:", res.data.error)
      }
    } catch (err) {
      console.error("Błąd podczas wysyłki maila:", err)
      setStatus('Błąd przy wysyłaniu. Spróbuj ponownie później.')
    }
  }
  

  return (
    <>
      <footer className='p-4 w-full flex justify-between items-center backdrop-blur-0 bg-white/5'>
        <div className='space-x-5'>
          <div>
            <h4 className='text-lg'>Nr Telefonu</h4>
            <div className='text-sm'>
              <p>+48 608-416-872</p>
              <p>+48 696-346-985</p>
            </div>
            <h4 className='text-lg'>E-mail</h4>
            <div className='text-sm'>
              <p>adazarach55@wp.pl</p>
            </div>
          </div>
        </div>

        <motion.div
          whileTap={{ scale: 0.9 }}
          className='backdrop-blur-0 bg-white/20 shadow-xl h-10 rounded-lg p-0.5'
        >
          <button onClick={() => setShowForm(true)}>Skontaktuj się z nami</button>
        </motion.div>

        <div className='flex flex-col items-center space-y-2'>
          <h4>Nasze Sociale</h4>
          <div className='flex space-x-4'>
            <motion.div whileTap={{ scale: 0.95 }}>
              <FiFacebook className='w-8 h-8 backdrop-blur-0 bg-blue-500/50 shadow-md rounded-full p-1' />
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }}>
              <FiInstagram className='w-8 h-8 backdrop-blur-0 bg-gradient-to-br from-orange-600 via-pink-600/80 to-yellow-400 shadow-md rounded-full p-1' />
            </motion.div>
          </div>
        </div>
      </footer>

      {/* FORM MODAL */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
          >
            <div className='bg-cyan-500/80 rounded-xl shadow-lg p-6 w-full max-w-md relative'>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowForm(false)}
                className='absolute top-2 right-3 text-black text-xl font-bold'
              >
                <FiX className='text-white h-8 w-6' />
              </motion.button>
              <h2 className='text-xl font-semibold mb-4'>Formularz Kontaktowy</h2>
              <form onSubmit={handleSubmit} className='space-y-4 flex flex-col'>
                <div>
                  <label className='block text-sm font-medium'>Imię i nazwisko</label>
                  <input
                    type='text'
                    name='name'
                    placeholder='Jan Kowalski'
                    className='text-black w-full border border-gray-300 rounded px-3 py-2 mt-1'
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium'>Nr Telefonu</label>
                  <input
                    type='text'
                    name='number'
                    placeholder='+48 727272704'
                    className='text-black w-full border border-gray-300 rounded px-3 py-2 mt-1'
                    required
                    value={formData.number}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium'>E-mail</label>
                  <input
                    type='email'
                    name='email'
                    placeholder='example@outlook.com'
                    className='w-full border border-gray-300 rounded px-3 py-2 mt-1'
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium'>Wiadomość</label>
                  <textarea
                    name='message'
                    rows='4'
                    className='text-black w-full border border-gray-300 rounded px-3 py-2 mt-1'
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type='submit'
                  className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                >
                  Wyślij
                </button>
                {status && <p className='text-white text-sm'>{status}</p>}
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Footer
