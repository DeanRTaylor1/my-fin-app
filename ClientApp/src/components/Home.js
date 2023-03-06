import { Fragment, useEffect, useState, Link } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //console.log(currentUser);
    //
    setIsLoading(false);
  }, []);

  return (
    <Fragment>
      <div className='w-[calc(100vw)] h-fit min-h-[calc(90vh)] flex flex-col items-start justify-start gap-10 z-10'>
        <div className='w-[100%] bg-white h-fit relative p-10 flex flex-col  justify-start items-center gap-4'>
          <div className='flex flex-col justify-center items-center md:flex-row'>
            <div className='flex flex-col gap-2 justify-center items-center p-4 max-w-[450px]'>
              <h1 className='w-full font-bold text-2xl '>
                Keep an eye on things.
              </h1>
              <h2 className='w-fit '>
                Making recording your finances easier with MyFin.
              </h2>
            </div>
            <div>
              <img
                alt='<a href="https://www.freepik.com/free-vector/modern-set-colorful-planning-elements_3199899.htm#query=hand%20drawn%20calculator&position=5&from_view=keyword">Freepik</a>'
                src={'/home-image.png'}
                width={450}
                height={450}
              />
            </div>
          </div>
          {/* {!currentUser && (
            <Link href={'/auth/signin'}>
              {' '}
              <button className='navButton w-full max-w-[800px]'>
                Sign up now!
              </button>
            </Link>
          )} */}
        </div>

        <div className='h-fit w-screen flex gap-8 md:gap-32 z-50 items-center justify-center '>
          <div className='w-[100%] h-fit relative p-10 flex flex-col-reverse md:flex-row justify-center items-center gap-4'>
            <div className='flex justify-center items-center max-w-screen w-[450px]'>
              <img
                alt='notebook'
                src='/notebook.png'
                width={450}
                height={450}
              />
            </div>
            <div className='flex max-w-[450px] flex-col gap-2 justify-center items-center  text-right'>
              <h2 className='w-full text-2xl font-bold '>Set targets</h2>
              <p className='w-full'>
                Tag outgoings and review your personal dasboard to see how it
                all adds up.
              </p>
            </div>
          </div>
        </div>

        <div className='h-fit w-screen bg-white flex gap-8 md:gap-32 items-center justify-center '>
          <div className='w-[100%] h-fit relative p-10 flex flex-col-reverse md:flex-row-reverse justify-center items-center gap-4'>
            <div className='flex justify-center items-center  '>
              <img alt='graph' src={'/graph.png'} width={450} height={450} />
            </div>
            <div className='flex max-w-[450px] flex-col gap-2 justify-center items-center text-left'>
              <h2 className='w-full text-2xl font-bold '>
                Understand and adapt
              </h2>
              <p className='w-full'>
                Tag outgoings and review your personal dasboard to see how it
                all adds up.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
