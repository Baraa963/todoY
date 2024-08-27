import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Todo from "./Todo";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function TodoList() {
  const [newTodo, setNewTodo] = useState([]);
  const [titleTodo, setTitleTodo] = useState("");
  const [detailsTodo, setDetailsTodo] = useState("");

  const [todos, setTodos] = useState([]);

  function handleAddTodo () {
    const newTodo = {
      id :uuidv4(),
      title :titleTodo,
      isCompleted:false
    }
    setTodos([...todos,newTodo])
  };
  const todosList = todos.map((t) => {
    return <Todo key={t.id} title={t.title} details={t.details} />;
  });
  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 270 }}>
        <CardContent>
          <Typography
            variant="h3"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            مهامي
          </Typography>
          <Divider />

          <ToggleButtonGroup
            style={{
              display: "flex",
              justifyContent: "center",
              direction: "ltr",
              marginTop: "2rem",
            }}
          >
            <ToggleButton value="not_done">الغير منجز</ToggleButton>
            <ToggleButton value="done">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>

          <div
            style={{
              maxHeight: "240px", // Adjust this value based on your needs
              overflowY: "auto",
              marginTop: "1rem",
              paddingLeft: "1rem",
            }}
          >
            {todosList}
          </div>
          <Grid container spacing={2} sx={{ width: "100%", marginTop: "1rem" }}>
            <Grid item xs={8}>
              <TextField
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                sx={{ width: "100%" }}
                value={titleTodo}
                onChange={(e) => setTitleTodo(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                sx={{ width: "110%", height: "100%" }}
                onClick={()=>{
                  handleAddTodo();
                }}
              >
                إضافة مهمة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
