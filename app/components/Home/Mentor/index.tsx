'use client'

import Image from 'next/image'

interface MemberType {
  imageSrc: string;
  name: string;
  title: string;
}

const Mentor = () => {

  const members: MemberType[] = [
    {
      imageSrc: '/images/team/cat.png',
      name: '김민',
      title: 'Project Manager',
    },
    {
      imageSrc: '/images/team/fox.png',
      name: '변만수',
      title: 'Project Leader',
    },
    {
      imageSrc: '/images/team/dog.png',
      name: '박중은',
      title: 'Fullstack Developer',
    },
    {
      imageSrc: '/images/team/bear.png',
      name: '김성민',
      title: 'Frontend Developer',
    },
    {
      imageSrc: '/images/team/rabbit.png',
      name: '이지영',
      title: 'Backend Developer',
    },
  ]

  return (
    <section id='mentors-section'>
      <div className='container'>
        <div className='flex flex-col sm:flex-row gap-5 justify-between sm:items-center mb-12'>
          <h2 className='font-bold tracking-tight'>Dedicated by the Makers of Apple Mango</h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  xl:gap-8'>
          {members.map((item, index) => (
            <div key={index} className='group relative shadow-lg'>
              <div className='min-h-80 w-full overflow-hidden rounded-lg bg-gray-100 lg:h-80'>
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  width={700}
                  height={700}
                  className='h-full w-full object-cover object-center lg:h-full lg:w-full '
                />
              </div>
              <div className='my-4 flex justify-center '>
                <div>
                  <div className='border border-white rounded-lg -mt-8 bg-white p-2 shadow-mentorShadow flex items-center justify-center'>
                    <p
                      className='text-sm text-gray-700 text-center'>
                      {item.title}
                    </p>
                  </div>
                  <p className='mt-3 text-2xl font-semibold text-black/80 text-center'>
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Mentor
