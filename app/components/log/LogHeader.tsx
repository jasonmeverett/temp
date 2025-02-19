import { View } from "@aws-amplify/ui-react"
import { AddCircleOutline, AddOutlined, PlusOneOutlined } from "@mui/icons-material"
import { Button } from "@mui/material"
import React from "react"



const LogHeader: React.FC = () => {


  return (<>
    <View style={{
      width: '100%',
      flexGrow: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <Button variant="contained"><AddCircleOutline />Log New Smoke</Button>


    </View>
  </>)
}

export default LogHeader;