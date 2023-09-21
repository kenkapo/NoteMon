export default function pagesFunc(len)
{
    const mod=(len%5===0)?0:1;
    return Math.max(Math.floor(len/5)+mod,1); 
}