// import styled from 'styled-components';
import tw from 'twin.macro';

export { BackgroundContainer, BoxContainer, Button };

const BackgroundContainer = tw.div`relative flex min-h-screen flex-col justify-center overflow-hidden bg-blue-950 py-6 sm:py-12`;
const BoxContainer = tw.div`relative bg-blue-900 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-400/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10`;
const Button = tw.button`rounded-md bg-yellow-700 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600`;

const HeaderText = tw.h1`mt-3 text-3xl font-extrabold tracking-tight text-slate-900`;
const SubheaderText = tw.h2`text-base font-semibold leading-7 text-gray-900`;