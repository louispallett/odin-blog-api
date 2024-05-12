// import styled from 'styled-components';
import tw from 'twin.macro';

export { 
    BackgroundContainer, 
    BackgroundContainerCentre, 
    BoxContainer, 
    HeaderContainer, 
    UsersContainer, 
    Button 
};

const BackgroundContainer = tw.div`relative flex min-h-screen flex-col overflow-hidden bg-gray-200 dark:bg-gray-800 py-0`;
const BackgroundContainerCentre = tw.div`relative flex justify-center min-h-screen flex-col overflow-hidden dark:bg-gray-800 py-6 sm:py-12`;
const UsersContainer = tw.div`bg-blue-950 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:rounded-lg max-sm:px-5 sm:px-8`;
const BoxContainer = tw.div`flex flex-col justify-center bg-none px-6 pt-10 pb-8 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10`;
const HeaderContainer = tw.header`relative z-20 flex bg-blue-950 justify-between py-3 pl-5 pr-3 sm:pl-6 sm:pr-4 md:pr-3.5 lg:px-6 space-x-4 antialiased border-b border-gray-500`

const Button = tw.button`rounded-md bg-yellow-700 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600`;

const HeaderText = tw.h1`mt-3 text-3xl font-extrabold tracking-tight text-slate-900`;
const SubheaderText = tw.h2`text-base font-semibold leading-7 text-gray-900`;