import { BackgroundContainer, HeaderContainer, HeaderContainerInner } from '../tailwind-containers';
import { Link } from 'react-router-dom';

export default function WriterDashboard() {
    return (
        <BackgroundContainer>
            <HeaderContainer>
                <HeaderContainerInner>
                    <div className='flex flex-col'>
                        <Link to="/dashboard/articles/" >
                            <h1 id="main-title" className="relative font-jaro inset-y-4 inset-x-3 text-2xl sm:inset-x-5 sm:text-4xl font-black text-white">The</h1>
                            <h1 id="main-title" className="text-2xl font-jaro sm:text-4xl font-black text-white">Guardian</h1>
                        </Link>
                        <h1 id="subtitle" className="self-end font-jaro font-black text-white">Writers</h1>
                    </div>
                </HeaderContainerInner>
            </HeaderContainer>  
        </BackgroundContainer>
    )
}