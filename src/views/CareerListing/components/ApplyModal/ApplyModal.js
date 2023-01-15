/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable semi */
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Alert from '@mui/material/Alert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '75%',
  width: '50%',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  maxHeight: '90%',
  p: 4,
  overflowY: 'scroll',
};

const ApplyModal = ({ handleApplyJobOpen, handleApplyClose }) => {
  //   const [openApplication, setOpenApplication] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Button onClick={handleApplyJobOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleApplyClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                  Enter your email
                </Typography>
                <TextField
                  label="Full Name *"
                  variant="outlined"
                  fullWidth
                  name={'fullName'}
                  {...register('fullName', { required: true })}
                  // @ts-ignore
                />
                {errors.fullName && errors.fullName.type === 'required' && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    This is required
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'space-between'}
                  width={1}
                  marginBottom={2}
                >
                  <Box marginBottom={{ xs: 1, sm: 0 }}>
                    <Typography variant={'subtitle2'}>Covr Letter</Typography>
                  </Box>
                </Box>

                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={10}
                  placeholder="Covr Letter"
                  style={{
                    width: '100%',
                    borderRadius: '5px',
                    border: '1px solid gray',
                  }}
                  name={'coverLetter'}
                  {...register('coverLetter', { required: true })}
                />
                {errors.coverLetter &&
                  errors.coverLetter.type === 'required' && (
                    <Alert severity="error" sx={{ mt: 1 }}>
                      This is required
                    </Alert>
                  )}
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'space-between'}
                  width={1}
                  marginBottom={2}
                >
                  <Box marginBottom={{ xs: 1, sm: 0 }}>
                    <Typography variant={'subtitle2'}>
                      Expected Salary
                    </Typography>
                  </Box>
                </Box>
                <TextField
                  label="Expected Salary *"
                  variant="outlined"
                  name={'salary'}
                  type={'salary'}
                  fullWidth
                  {...register('salary', { required: true })}
                  // @ts-ignore
                />
                {errors.salary && errors.salary.type === 'required' && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    This is required
                  </Alert>
                )}
              </Grid>
              <Grid item container xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'space-between'}
                  width={1}
                  maxWidth={600}
                  margin={'0 auto'}
                >
                  <Box marginBottom={{ xs: 1, sm: 0 }}></Box>
                  <Button size={'large'} variant={'contained'} type={'submit'}>
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ApplyModal;
