import Cookie from 'js-cookie';
export const getUserInfo = ()=>{
    return Cookie.getJSON('userInfo') || null;
}