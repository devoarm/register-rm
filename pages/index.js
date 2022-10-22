import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { useForm, Controller } from "react-hook-form";
import { server } from "../config/utils";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
export default function Home({ dataDept, dataHeader, dataLevel }) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [pname, setPname] = useState("");
  const [pnameError, setPnameError] = useState(false);
  const [depts, setDepts] = useState(dataDept.results ?? []);
  const [header, setHeader] = useState(dataHeader.results ?? []);
  const [level, setLevel] = useState(dataLevel.results ?? []);

  const handleChange = (event) => {
    setPname(event.target.value);
  };
  const onSubmit = async (data) => {
    let dataFetch = {
      fullname: `${pname}${data.fname} ${data.lname}`,
      fname: `${data.fname}`,
      lname: ` ${data.lname}`,
      loginname: data.loginname,
      password: data.password,
      person_id: data.cid,
      dept: data.dept,
      level: data.level,
      header: data.header,
    };
    const response = await fetch(`api/register`, {
      body: JSON.stringify(dataFetch),
      method: "POST",
    });
    const res = await response.json();
    if (res.msg == "hasName") {
      Swal.fire({
        icon: "error",
        title: "คุณเคยสมัครไปแล้ว",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (res.msg == "hasUser") {
      Swal.fire({
        icon: "error",
        title: "ชื่อผู้ใช้งานได้ใช้งานแล้ว",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (res.msg == "hasCid") {
      Swal.fire({
        icon: "error",
        title: "เลขบัตรประชาชนซ้ำ",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.push(`https://www.aranhos.go.th/rmaran/`);
      });
    }
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            โรงพยาบาลอรัญประเทศ
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography component="h1" variant="h5">
              สมัครใช้งาน ระบบรายงานความเสี่ยง
            </Typography>
            <TextField
              error={errors.cid}
              margin="normal"
              fullWidth
              id="cid"
              label="กรุณากรอกเลขบัตรประชาชน"
              autoFocus
              {...register("cid", { required: true })}
            />
            {errors.cid && (
              <span className="text-red-600">**กรุณากรอกเลขบัตรประชาชน</span>
            )}
            <FormControl
              margin="normal"
              fullWidth
              error={Boolean(errors.pname)}
            >
              <InputLabel id="demo-simple-select-label">
                เลือกคำนำหน้า
              </InputLabel>
              <Controller
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value="นาย">นาย</MenuItem>
                    <MenuItem value="นาง">นาง</MenuItem>
                    <MenuItem value="นางสาว">นางสาว</MenuItem>
                  </Select>
                )}
                name={"pname"}
                control={control}
                rules={{
                  required: "กรุณาเลือกสถานะการใช้งาน",
                }}
              ></Controller>
              <FormHelperText>{errors.pname?.message}</FormHelperText>
            </FormControl>
            <TextField
              error={errors.fname}
              margin="normal"
              fullWidth
              label="ชื่อ"
              id="fullname"
              {...register("fname", { required: true })}
            />
            {errors.fname && (
              <span className="text-red-600">**กรุณากรอกชื่อ</span>
            )}
            <TextField
              error={errors.lname}
              margin="normal"
              fullWidth
              label="นามสกุล"
              id="fullname"
              {...register("lname", { required: true })}
            />
            {errors.lname && (
              <span className="text-red-600">**กรุณากรอกนามสกุล</span>
            )}
            <TextField
              error={errors.loginname}
              margin="normal"
              fullWidth
              id="username"
              label="สร้างชื่อผู้ใช้ (user)"
              autoFocus
              {...register("loginname", { required: true })}
            />
            {errors.loginname && (
              <span className="text-red-600">**กรุณากรอกชื่อผู้ใช้งาน</span>
            )}

            <TextField
              error={Boolean(errors.password)}
              margin="normal"
              fullWidth
              label="สร้างรหัสผ่าน"
              id="password"
              {...register("password", {
                required: "**กรุณาสร้างรหัสผ่าน",
                pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
              })}
            />
            <span>
              * รหัสผ่านต้องไม่ต่ำกว่า 6 หลัก และ มีตัวอักษรภาษาอังกฤษอย่างน้อย
              1 ตัว
            </span>

            <FormControl margin="normal" fullWidth error={Boolean(errors.dept)}>
              <InputLabel id="demo-simple-select-label">แผนก</InputLabel>
              <Controller
                render={({ field }) => (
                  <Select {...field}>
                    {depts.map((item) => (
                      <MenuItem value={item.dept} key={item.dept}>{item.descriptions}</MenuItem>
                    ))}
                  </Select>
                )}
                name={"dept"}
                control={control}
                rules={{
                  required: "กรุณาเลือกแผนก",
                }}
              ></Controller>
              <FormHelperText>{errors.dept?.message}</FormHelperText>
            </FormControl>
            <FormControl
              margin="normal"
              fullWidth
              error={Boolean(errors.header)}
            >
              <InputLabel id="demo-simple-select-label">
                สถานะการใช้งาน
              </InputLabel>

              <Controller
                render={({ field }) => (
                  <Select {...field}>
                    {header.map((item) => (
                      <MenuItem value={item.id} key={item.id}>{item.description}</MenuItem>
                    ))}
                  </Select>
                )}
                name={"header"}
                control={control}
                rules={{
                  required: "กรุณาเลือกสถานะการใช้งาน",
                }}
              ></Controller>
              <FormHelperText>{errors.header?.message}</FormHelperText>
            </FormControl>
            <FormControl
              margin="normal"
              fullWidth
              error={Boolean(errors.level)}
            >
              <InputLabel id="demo-simple-select-label">
                สิทธิการใช้งาน
              </InputLabel>
              <Controller
                render={({ field }) => (
                  <Select {...field}>
                    {level.map((item) => (
                      <MenuItem value={item.level} key={item.level}>{item.description}</MenuItem>
                    ))}
                  </Select>
                )}
                name={"level"}
                control={control}
                rules={{
                  required: "กรุณาสิทธิการใช้งาน",
                }}
              ></Controller>
              <FormHelperText>{errors.level?.message}</FormHelperText>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              className="bg-blue-600"
              sx={{ mt: 3, mb: 2 }}
            >
              สมัครใช้งาน
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
}
export async function getServerSideProps() {
  // Fetch data from external API
  const resDept = await fetch(`${server}/api/dept`);
  const dataDept = await resDept.json();
  const resHeader = await fetch(`${server}/api/header`);
  const dataHeader = await resHeader.json();
  const resLevel = await fetch(`${server}/api/level`);
  const dataLevel = await resLevel.json();

  // Pass data to the page via props
  return { props: { dataDept, dataHeader, dataLevel } };
}
