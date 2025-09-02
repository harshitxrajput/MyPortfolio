import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import { toast } from 'react-toastify';

const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({ ...form, [name]: value });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs.send('service_8y6d41v', 'template_d2j0bmo', {
            name: form.name,
            email: form.email,
            message: form.message
        }, '4OjyfC8SZOjQlA1g7').then(() => {
            setLoading(false);
            toast.info("Thank you. I'll get back to you as soon as possible.", {
                style: {
                    background: "#100D25",
                    color: "#ffffff",
                    fontWeight: "500",
                },
            });
            setForm({ name: '', email: '', message: '' });
        }), (err) => {
            setLoading(false);
            console.log(err);
            alert("Something went wrong");
        }
    }

    return (
        <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
            <motion.div variants={slideIn("left", "tween", 0.2, 1)} className='flex-[0.75] bg-black-100 p-8 rounded-2xl'>
                <p className={styles.sectionSubText}>Get in Touch</p>
                <h3 className={styles.sectionHeadText}>Contact.</h3>

                <form ref={formRef} onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
                    <label htmlFor="" className='flex flex-col'><span className='text-white font-medium mb-4'>Your Name</span></label>
                    <input type="text" name='name' value={form.name} onChange={handleChange} placeholder="What's your good name?" className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium' />
                    <label htmlFor="" className='flex flex-col'><span className='text-white font-medium mb-4'>Your Email</span></label>
                    <input type="email" name='email' value={form.email} onChange={handleChange} placeholder="What's your web address?" className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium' />
                    <label htmlFor="" className='flex flex-col'><span className='text-white font-medium mb-4'>Your Message</span></label>
                    <textarea rows={7} type="text" name='message' value={form.message} onChange={handleChange} placeholder="What do you want to say?" className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium' />

                    <button type='submit' className='bg-gray-100 py-3 px-8 outline-none w-fit text-tertiary font-bold shadow-md shadow-primary rounded-xl'>
                        {loading ? "Sending..." : "Send"}
                    </button>
                </form>
            </motion.div>

            <motion.div variants={slideIn("right", "tween", 0.2, 1)} className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'>
                <EarthCanvas />
            </motion.div>
        </div>
    )
}

export default SectionWrapper(Contact, "contact");