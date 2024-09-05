import * as React from "react";
import { useState, useMemo } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import { useToast } from "../Contexts/ToastContext";

export default function TodoList({ todos, dispatch }) {
  const [view, setView] = useState("all");
  const [titleTodo, setTitleTodo] = useState("");
  const [detailsTodo, setDetailsTodo] = useState("");
  const { showToast } = useToast();

  function handleAddTodo() {
    console.log("handleAddTodo called");

    dispatch({
      type: "TodoAdd",
      payload: { newTodo: { title: titleTodo, details: detailsTodo } },
    });

    setTitleTodo("");
    setDetailsTodo("");

    showToast("تمت إضافة مهمة جديدة بنجاح", "success");
  }

  const filteredTodos = useMemo(() => {
    return todos
      .filter((t) => {
        if (view === "done") return t.isCompleted;
        if (view === "not_done") return !t.isCompleted;
        return true;
      })
      .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
  }, [todos, view]);

  const todoList = filteredTodos.map((t) => (
    <Todo key={t.id} todo={t} dispatch={dispatch} />
  ));

  React.useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    dispatch({ type: "InitializeTodos", payload: storageTodos });
  }, [dispatch]);

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
            color="secondary"
            onChange={(e) => setView(e.target.value)}
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
          <Grid container spacing={2} sx={{ width: "100%", marginTop: "1rem",marginRight:"0.4rem"}}>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                sx={{ width: "100%" }}
                value={titleTodo}
                onChange={(e) => setTitleTodo(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label=" التفاصيل "
                variant="outlined"
                sx={{ width: "100%" }}
                value={detailsTodo}
                onChange={(e) => setDetailsTodo(e.target.value)}
              />
            </Grid>
            <Grid item xs={11}>
              <Button
                variant="contained"
                sx={{ width: "110%", height: "100%" }}
                onClick={handleAddTodo}
                disabled={titleTodo.length === 0 || detailsTodo.length===0}
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
