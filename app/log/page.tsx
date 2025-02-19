"use client";

import "@aws-amplify/ui-react/styles.css";
import "@/app/app.css";
import React, { useEffect, useState } from "react"
import { fetchUserAttributes } from "aws-amplify/auth";
import { Heading, useAuthenticator, View } from "@aws-amplify/ui-react";
import LogHeader from "../components/log/LogHeader";

const HomePage: React.FC = () => {
  const { user, signOut } = useAuthenticator();

  const [nickname, setNickname] = useState<string | undefined>();

  useEffect(() => {
    const internal = async () => {
      const att = await fetchUserAttributes();
      setNickname(att.nickname);
    }
    
    internal();
  }, [])

  return (<>
    <View style={{
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <LogHeader />
    </View>
  </>)
}

export default HomePage;