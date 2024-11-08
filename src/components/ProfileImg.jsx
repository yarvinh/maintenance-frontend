const ProfileImg = ({user,isDisplay})=>{
    const handleOnImg=(e)=>{
        if (e.target.className.includes('profile-image-larger'))
           e.target.className = 'profile-image'
        else
           e.target.className = 'profile-image-larger' 
    }
  
    if (user.profile_image ){
        return  <img src={user.profile_image} onClick={handleOnImg} className={`profile-image  bar-accordion ${isDisplay.isDisplay && "hide-profile"}`} />
    } else if(user.is_login){
       return <img src="/blank-profile-picture-973460_1280.webp"  className={`profile-image  bar-accordion ${isDisplay.isDisplay && "hide-profile"}`} /> 
    }else {
        return  <div className="bar-with-no-login bar-accordion" ></div>
    }
}


export default ProfileImg