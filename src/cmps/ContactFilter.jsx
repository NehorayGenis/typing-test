import { memo } from 'react'
import { useFormRegister } from '../customHooks/useFormRegister';

export const ContactFilter = memo((props) => {

    const [register] = useFormRegister({
        name: '',
    }, props.onChangeFilter)

    return (
        <form className='contact-filter'>
            <section>
                <label htmlFor="name">name</label>
                <input {...register('name')} type='text' className='contact-filter'/>
            </section>
        </form>
    )
})
