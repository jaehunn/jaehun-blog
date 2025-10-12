import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center space-y-8 py-12">
      {/* Profile Section */}
      <div className="space-y-6">
        <Image
          src="/images/profile.webp"
          alt="방재훈"
          className="rounded-full object-cover mx-auto"
          width={180}
          height={180}
        />

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">방재훈</h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            {'안녕하세요,'}
            <br />
            {'프론트엔드 개발자 방재훈입니다.'}
            {''}
          </p>
        </div>
      </div>
    </div>
  )
}
