import { tv } from 'tailwind-variants'
import logoImage from '../assets/logo.svg'
import loginBgImage from '../assets/login-image.png'

const thumbnailVariants = tv({
  slots: {
    container:
      'relative w-[695px] h-screen flex-shrink-0 overflow-hidden max-lg:w-full max-lg:h-[300px] max-md:h-[200px]',
    backgroundImage:
      'absolute top-4 left-3 w-[calc(100%-32px)] h-[calc(100%-32px)] object-cover rounded-[18px]',
    overlay:
      'relative w-full h-full p-12 flex flex-col justify-between max-md:p-6 bg-gradient-to-br from-custom-bg-tab/90 to-custom-bg-tab/75',
    logo: 'w-16 h-16',
    textContainer: 'flex flex-col gap-3 w-[346px] max-md:w-full',
    subtitle:
      'text-base leading-[1.689] m-0 max-md:text-sm font-display text-custom-text-brand',
    title:
      'text-xl leading-[1.689] m-0 max-md:text-base font-display text-custom-text-tagline',
  },
})

export function Thumbnail() {
  const styles = thumbnailVariants()

  return (
    <div className={styles.container()}>
      <img
        src={loginBgImage}
        alt="Login"
        className={styles.backgroundImage()}
      />
      <div className={styles.overlay()}>
        <img src={logoImage} alt="Logo" className={styles.logo()} />
        <div className={styles.textContainer()}>
          <h2 className={styles.subtitle()}>ab filmes</h2>
          <h1 className={styles.title()}>
            O guia definitivo para os amantes do cinema
          </h1>
        </div>
      </div>
    </div>
  )
}
