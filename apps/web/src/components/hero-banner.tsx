export function HeroBanner() {
  return (
    <div className='bg-muted-foreground/5 flex h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border'>
      <img
        src='https://placehold.co/1920x1080?text=Banner+Principal'
        alt='BannerPlaceholder'
        className='h-full w-full object-cover'
      />
    </div>
  )
}
