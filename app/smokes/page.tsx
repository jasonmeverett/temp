"use client";

import "@aws-amplify/ui-react/styles.css";
import "@/app/app.css";
import React, { useEffect, useState } from "react"
import { fetchUserAttributes } from "aws-amplify/auth";
import { Heading, useAuthenticator, View } from "@aws-amplify/ui-react";

import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Box, Card, Divider, Typography } from "@mui/material";

const client = generateClient<Schema>();

const HomePage: React.FC = () => {
  const { user, signOut } = useAuthenticator();

  const [nickname, setNickname] = useState<string | undefined>();
  const [smokes, setSmokes] = useState<any[]>([]);

  useEffect(() => {
    const internal = async () => {
      const att = await fetchUserAttributes();
      setNickname(att.nickname);
    }
    
    internal();
  }, [])

  const fecthSmokes = async () => {
    const listSmokes = await client.models.Smokes.list();
    setSmokes(listSmokes.data);
  }

  useEffect(() => {
    fecthSmokes();
  }, [])

  return (<>
    <View style={{
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Heading
        level={1}
      >
        Smokes
      </Heading>
      <Box sx={{
        gap: 3,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {smokes.map(smoke => (<Card>
          <Heading level={3}>{smoke.name}</Heading>
          <Divider />
          <Typography>Is Active: {JSON.stringify(smoke.isActive)}</Typography>
        </Card>))}
      </Box>
      
    </View>
  </>)
}

export default HomePage;