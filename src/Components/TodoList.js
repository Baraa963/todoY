import React, { useContext, useState, useEffect } from "react";
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
import { TodosContext } from "../Contexts/TodosContext";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  /**=========== todos Context Data =========== */
  const { todos, setTodos } = useContext(TodosContext);

  /**=========== State to Control Filter View =========== */
  const [view, setView] = useState("all");

  /**=========== titleTodo & detailsTodo useStates =========== */
  const [titleTodo, setTitleTodo] = useState("");
  const [detailsTodo, setDetailsTodo] = useState("");

  /**=========== Add a New Todo =========== */
  function handleAddTodo() {
    const newTodo = {
      id: uuidv4(),
      title: titleTodo,
      details: detailsTodo,
      isCompleted: false,
      createdDate: new Date(), // Oluşturulma tarihi ekliyoruz
    };
    setTitleTodo("");
    setDetailsTodo("");
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  /**=========== Filter Todos Based on Selected View =========== */
  const filteredTodos = (todos || [])
    .filter((t) => {
      if (view === "done") return t.isCompleted;
      if (view === "not_done") return !t.isCompleted;
      return true;
    })
    .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)); // Görevleri tarihe göre sıralıyoruz (yeni > eski)

  const todoList = filteredTodos.map((t) => <Todo key={t.id} todo={t} />);
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storageTodos);
  }, []);

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
            value={view}
            exclusive
            onChange={(e, newView) => setView(newView)}
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
              maxHeight: "240px",
              overflowY: "auto",
              marginTop: "1rem",
            }}
          >
            {todoList.length > 0 ? (
              todoList
            ) : (
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                لايوجد مهام
              </Typography>
            )}
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
                onClick={handleAddTodo}
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
