'use client'
import SocialSignIn from '../SocialSignIn'
import Logo from '@/app/components/Layout/Header/Logo'

const Signin = () => {

  return (
    <>
      <div className='mb-5 text-center mx-auto inline-block w-full'>
        <Logo isThumbnail={false} />
      </div>

      <SocialSignIn />
    </>
  )
}

export default Signin
