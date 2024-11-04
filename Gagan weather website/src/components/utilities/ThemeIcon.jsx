import { useEffect, useState } from 'react'
import lightMode from '../../assets/images/light-mode.png'
import darkMode from '../../assets/images/dark-mode.png'

const ThemeIcon = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [icon, setIcon] = useState(darkMode);

    useEffect(() => {
        if(isDarkTheme) {
            setIcon(darkMode);
        }
        else {
            setIcon(lightMode);
        }

        const root = document.documentElement;
        root?.style.setProperty('--bg-main', isDarkTheme ? '#100E1D' : 'linear-gradient(180deg, #fff, #ccc)');
        root?.style.setProperty('--bg-secondary', isDarkTheme ? '#1E213A' : 'linear-gradient(to bottom, #92B4EC, #fff)');
        root?.style.setProperty('--bg-popup', isDarkTheme ? '#100E1D' : 'linear-gradient(to bottom, #ECF9FF, #92B4EC)');
        root?.style.setProperty('--font-main', isDarkTheme ? '#eee' : '#100E1D');
        root?.style.setProperty('--bg-overlay', isDarkTheme ? '#fff' : '#000');
    }, [isDarkTheme])


  return (
    <div className='theme-icon' onClick={() => setIsDarkTheme(prev => !prev)}>
        <img src={icon} alt="" />
    </div>
  )
}

export default ThemeIcon