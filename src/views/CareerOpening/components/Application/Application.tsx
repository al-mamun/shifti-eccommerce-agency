import React, { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { api } from 'api/config';
import { useForm } from 'react-hook-form';

const validationSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid full name')
    .max(50, 'Please enter a valid full name')
    .required('Please specify your full name'),
  message: yup
    .string()
    .trim()
    .required('Please specify your message'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

const Application = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const { slug } = useParams();
  const [currentID, setIID] = useState();
  const [job_title, settitle] = useState();
  
  useEffect(() => {
    // console.log(slug);
    fetch(`${api}/api/frontend/single/job/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setIID(data?.ID);
        settitle(data?.title);
      });
  }, []);

  const initialValues = {
    fullName: '',
    message: '',
    email: '',
  };

  const onSubmit = (data) => {
    const body = new FormData();
    const list = {
      fullName: data.fullName,
      message: data.message,
      email: data.email,
      cv: data.cv,
      coverLetter: data.coverLetter,
      data_req: data,
      job_id: currentID
    };

    fetch(`${api}/api/frontend/apply-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type':'multipart/form-data',
        Accept: 'application/json',
        
      },
      body: JSON.stringify(list),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success('Successfully send your application', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
};

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

    const { register, handleSubmit } = useForm();
  
  const onSubmit1 = async (data) => {
      const formData = new FormData();
      formData.append('file', data.file[0]);
      formData.append('fullName', data.fullName);
      formData.append('job_id', currentID);
      formData.append('email', data.email);
      formData.append('coverLetter', data.email);
    
      const res = await fetch(`${api}/api/frontend/apply-job`, {
          method: 'POST',
          body: formData,
      }).then((res) => res.json())
      .then((data) => {
        toast.success('Successfully send your application', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });

    
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit1)}>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
        {/* Same as */}
        <ToastContainer />
      <Typography
          variant={'h4'}
          sx={{ fontWeight: 700 }}
          gutterBottom
          align={'center'}
        >
          Apply for this job
        </Typography>
        <Typography color="text.secondary" align={'center'}>
          We develop intelligent solutions for companies to reduce their
          operational costs, increase their profitability and improve service
          quality.
        </Typography>
        <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12} data-aos="fade-up">
          <Typography
            variant="subtitle1"
            color="text.primary"
            fontWeight={700}
            gutterBottom
          >
            Full name
          </Typography>
            <TextField
              placeholder="Your full name"
              variant="outlined"
              size="medium"
              name="fullName"
              fullWidth
              type="text"
              {...register('fullName')}
            />

            <TextField
              
              name="job_id"
              type="hidden"
              value={currentID}
              {...register('job_id')}
            />
          </Grid>
          <Grid item xs={12} data-aos="fade-up">
            <Typography
              variant="subtitle1"
              color="text.primary"
              fontWeight={700}
              gutterBottom
            >
              E-mail
            </Typography>
             <TextField
               placeholder="Your e-mail address"
               variant="outlined"
               size="medium"
               name="email"
               fullWidth
               type="email"
               {...register('email')}
             />
           </Grid>
           <Grid item xs={12} data-aos="fade-up">
             <Typography
               variant="subtitle1"
               color="text.primary"
               fontWeight={700}
               gutterBottom
             >
               Message
             </Typography>
             <TextField
               placeholder="Your question about our services"
               variant="outlined"
               name="message"
               fullWidth
               multiline
               rows={4}
               value={formik.values.message}
               onChange={formik.handleChange}
               error={formik.touched.message && Boolean(formik.errors.message)}
               // @ts-ignore
               helperText={formik.touched.message && formik.errors.message}
             />
           </Grid>
           <Grid item xs={12} sm={12} data-aos="fade-up">
              <Button
                  variant="outlined"
                  component="label"
                  color="primary"
                  fullWidth
                  size="large"
                  startIcon={
                  <Box
                      component={'svg'}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      width={20}
                      height={20}
                      >
                      <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                      />
                      </Box>
                  }
                  >
                  Upload CV
                  <input type="file" {...register('file')}
                      name="file" style={{ display: 'none' }} />
                  </Button>
              </Grid>
              
           <Grid item container justifyContent="center" xs={12}>
             <Button
               variant="contained"
               type="submit"
               color="primary"
               size="large"
             >
               Apply now
             </Button>
           </Grid>
           </Grid>
      
      </form>
    </div>
    // <Box maxWidth={800} margin={'0 auto'}>
    //   <Box>
    //     <ToastContainer
    //         position="top-right"
    //         autoClose={1000}
    //         hideProgressBar={false}
    //         newestOnTop={false}
    //         closeOnClick
    //         rtl={false}
    //         pauseOnFocusLoss
    //         draggable
    //         pauseOnHover
    //         theme="light"
    //       />
    //     {/* Same as */}
    //     <ToastContainer />
    //   </Box>
    //   <Box marginBottom={2}>
    //     <Typography
    //       variant={'h4'}
    //       sx={{ fontWeight: 700 }}
    //       gutterBottom
    //       align={'center'}
    //     >
    //       Apply for this job
    //     </Typography>
    //     <Typography color="text.secondary" align={'center'}>
    //       We develop intelligent solutions for companies to reduce their
    //       operational costs, increase their profitability and improve service
    //       quality.
    //     </Typography>
    //   </Box>
    //   <Box
    //     component={'form'}
    //     onSubmit={formik.handleSubmit}
        
    //     sx={{
    //       '& .MuiOutlinedInput-root.MuiInputBase-multiline': {
    //         padding: 0,
    //       },
    //       '& .MuiOutlinedInput-input': {
    //         background: theme.palette.background.paper,
    //         padding: 2,
    //       },
    //     }}
    //   >
    //     <Grid container spacing={isMd ? 4 : 2}>
    //       <Grid item xs={12} data-aos="fade-up">
    //         <Typography
    //           variant="subtitle1"
    //           color="text.primary"
    //           fontWeight={700}
    //           gutterBottom
    //         >
    //           Full name
    //         </Typography>
    //         <TextField
    //           placeholder="Your full name"
    //           variant="outlined"
    //           size="medium"
    //           name="fullName"
    //           fullWidth
    //           type="text"
    //           value={formik.values.fullName}
    //           onChange={formik.handleChange}
    //           error={formik.touched.fullName && Boolean(formik.errors.fullName)}
    //           // @ts-ignore
    //           helperText={formik.touched.fullName && formik.errors.fullName}
    //         />
    //         <TextField
              
    //           name="job_id"
    //           type="hidden"
    //           value={currentID}
    //           onChange={formik.handleChange}
    //         />
    //       </Grid>
    //       <Grid item xs={12} data-aos="fade-up">
    //         <Typography
    //           variant="subtitle1"
    //           color="text.primary"
    //           fontWeight={700}
    //           gutterBottom
    //         >
    //           E-mail
    //         </Typography>
    //         <TextField
    //           placeholder="Your e-mail address"
    //           variant="outlined"
    //           size="medium"
    //           name="email"
    //           fullWidth
    //           type="email"
    //           value={formik.values.email}
    //           onChange={formik.handleChange}
    //           error={formik.touched.email && Boolean(formik.errors.email)}
    //           // @ts-ignore
    //           helperText={formik.touched.email && formik.errors.email}
    //         />
    //       </Grid>
    //       <Grid item xs={12} sm={6} data-aos="fade-up">
    //         <Button
    //           variant="outlined"
    //           component="label"
    //           color="primary"
    //           fullWidth
    //           size="large"
    //           startIcon={
    //             <Box
    //               component={'svg'}
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="currentColor"
    //               viewBox="0 0 20 20"
    //               width={20}
    //               height={20}
    //             >
    //               <path
    //                 fillRule="evenodd"
    //                 d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
    //                 clipRule="evenodd"
    //               />
    //             </Box>
    //           }
    //         >
    //           Upload CV
    //           <input type="file"   value={formik.values.cv}
    //           onChange={formik.handleChange}
    //           name="cv" style={{ display: 'none' }} />
    //         </Button>
    //       </Grid>
    //       <Grid item xs={12} sm={6} data-aos="fade-up">
    //         <Button
    //           variant="outlined"
    //           component="label"
    //           color="primary"
    //           fullWidth
    //           size="large"
    //           startIcon={
    //             <Box
    //               component={'svg'}
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="currentColor"
    //               viewBox="0 0 20 20"
    //               width={20}
    //               height={20}
    //             >
    //               <path
    //                 fillRule="evenodd"
    //                 d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
    //                 clipRule="evenodd"
    //               />
    //             </Box>
    //           }
    //         >
    //           Upload cover letter
    //           <input type="file"   value={formik.values.coverLetter}
    //           onChange={formik.handleChange} name="coverLetter" style={{ display: 'none' }} />
    //         </Button>
    //       </Grid>
    //       <Grid item xs={12} data-aos="fade-up">
    //         <Typography
    //           variant="subtitle1"
    //           color="text.primary"
    //           fontWeight={700}
    //           gutterBottom
    //         >
    //           Message
    //         </Typography>
    //         <TextField
    //           placeholder="Your question about our services"
    //           variant="outlined"
    //           name="message"
    //           fullWidth
    //           multiline
    //           rows={4}
    //           value={formik.values.message}
    //           onChange={formik.handleChange}
    //           error={formik.touched.message && Boolean(formik.errors.message)}
    //           // @ts-ignore
    //           helperText={formik.touched.message && formik.errors.message}
    //         />
    //       </Grid>
    //       <Grid item container justifyContent="center" xs={12}>
    //         <Button
    //           variant="contained"
    //           type="submit"
    //           color="primary"
    //           size="large"
    //         >
    //           Apply now
    //         </Button>
    //       </Grid>
    //     </Grid>
    //   </Box>
    // </Box>
  );
};

export default Application;
