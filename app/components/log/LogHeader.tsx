import { Heading, Input, Text, View } from "@aws-amplify/ui-react"
import { AddCircleOutline, AddOutlined, ArrowDownwardOutlined, PlusOneOutlined } from "@mui/icons-material"
import { Box, Button, Menu, MenuItem, Modal, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import type { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const client = generateClient<Schema>();

const LogHeader: React.FC = () => {
  const [curSmokeName, setCurSmokeName] = useState<string | null>();
  const [activeSmokes, setActiveSmokes] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [smokeName, setSmokeName] = useState<string | undefined>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const fecthSmokes = async () => {
    const listActiveSmokes = await client.models.Smokes.list({
      filter: {
        and: [
          {
            isActive: {eq: true}
          }
        ]
      }
    });
    setActiveSmokes(listActiveSmokes.data);
  }

  useEffect(() => {
    fecthSmokes();
  }, [])

  const handleNewSmoke = async () => {
    const newSmoke = await client.models.Smokes.create({
      name: smokeName,
      isActive: true
    });
    setCurSmokeName(newSmoke.data?.name);
  }

  return (<>
    <View style={{
      width: '100%',
      flexGrow: 0,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{...modalStyle, display: 'flex', flexDirection: 'column', gap: 2, width: '100%'}}>
          <Text style={{color: 'white'}}>Smoke Name</Text>
          <Input 
            style={{color: 'white'}}
            value={smokeName}
            placeholder="Name of smoke"
            onChange={e => setSmokeName(e.target.value)}
          />
          <Box sx={{width: '100%', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button onClick={() => {handleNewSmoke(); handleClose();}} style={{flexGrow: 0, alignSelf: 'end'}}>Add Smoke</Button>
          </Box>
        </Box>
      </Modal>
      <Button variant="contained" onClick={() => {setSmokeName(undefined); handleOpen();}}><AddCircleOutline />Log New</Button>
      <div>
        <Button variant="outlined" onClick={handleMenuClick}>{curSmokeName || "Select Active Smoke"} <ArrowDownwardOutlined /> </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
        >
          {activeSmokes.map(smoke => 
            (<MenuItem
              onClick={handleClose}
            >{smoke.name}</MenuItem>)
          )}
        </Menu>
      </div>

    </View>
  </>)
}

export default LogHeader;