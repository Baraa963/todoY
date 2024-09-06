import {useState,useEffect,useMemo,Button,TextField,Grid,Container,Card,CardContent,
  Typography,Divider,ToggleButton,ToggleButtonGroup,Todo,useToast,useTodos,
} from "../Imports/Imports"; 

export default function TodoList() {
  const [view, setView] = useState("all");
  const [titleTodo, setTitleTodo] = useState("");
  const [detailsTodo, setDetailsTodo] = useState("");
  const { showToast } = useToast();
  const { todos,dispatch } = useTodos();

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

  useEffect(() => {
    dispatch({ type: "InitializeTodos" });
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
            color="primary"
            onChange={(e) => setView(e.target.value)}
            style={{
              display: "flex",
              justifyContent: "center",
              direction: "ltr",
              margin: "1.8rem 0 0rem 0",
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
              margin:"1rem 0"
            }}
          >
            {todoList.length > 0 ? (
              todoList
            ) : (
              <Typography variant="h6" sx={{ textAlign: "center", margin:"1rem 0", color:"#de0000" }}>
                لايوجد مهام
              </Typography>
            )}
          </div>
          <Grid
            container
            spacing={2}
            sx={{ width: "100%", marginRight: "0.48rem" }}
          >
            <Grid item xs={6} sx={{ direction: "rtl" }}>
              <TextField
                label="عنوان المهمة"
                variant="outlined"
                sx={{ width: "100%" }}
                value={titleTodo}
                onChange={(e) => setTitleTodo(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
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
                sx={{ width: "110%", height: "130%" }}
                onClick={handleAddTodo}
                disabled={titleTodo.length === 0}
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
