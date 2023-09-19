import { getServerSession } from 'next-auth'

import Feed from '@/components/Feed'
import options from '@/libs/options'

const Home = async () => {
  const session = await getServerSession(options)
  return (
    <main
      className={`grid ${
        session
          ? 'grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto'
          : 'grid-cols-1 md:grid-cols-2 md:max-w-3xl mx-auto'
      } `}
    >
      <Feed />
    </main>
  )
}

export default Home
