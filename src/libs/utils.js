export const getElementAbsPos = (element) => 
{
    var t = element.offsetTop;
    var l = element.offsetLeft;
    element = element.offsetParent
    while(element)
    {
       t += element.offsetTop;
       l += element.offsetLeft;
       element = element.offsetParent;
    }
 
    return {left:l,top:t};
}
