import React from 'react';
import { useNavigate } from "react-router-dom";
import supabase from '../../supabase'
import { Auth, Typography, Button } from '@supabase/ui'



const Container = (props) => {
  const navigate = useNavigate();
  const { user } = Auth.useUser()
  if (user){
    navigate('/Dashboard');
  }
  return props.children
}
const Form = () =>{
return (
  <>
  <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase} >
        <Auth supabaseClient={supabase} />
      </Container>
    </Auth.UserContextProvider>
  </>
);
};

export default Form;