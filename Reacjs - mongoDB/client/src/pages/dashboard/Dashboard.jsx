import { Form, Input } from "antd";
import {
  useGetFlowersQuery,
  useAddFlowerMutation,
} from "../../services/flowerApi";
import FormItem from "antd/es/form/FormItem";

function Dashboard() {
  const { data, isLoading } = useGetFlowersQuery();

  const [mutate] = useAddFlowerMutation();
  console.log(data);
  const onChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = async (data) => {
    console.log("data: " + data);
    try {
      const newData = {
        ...data,
      };
      console.log(newData);
      await mutate(newData).unwrap();
    } catch (err) {
      console.log(err.message);
    }
  };
  if (isLoading) {
    return <div> flower is loading</div>;
  }
  return (
    <div
      style={{
        flex: 1,
        overflow: "auto",
      }}
    >
      <h1>Create Flower: </h1>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ flex: 1 }}
        layout="horizontal"
        style={{
          marginTop: 20,
          maxHeight: "400px",
          overflowY: "auto",
          padding: "4px 0",
        }}
        onFinish={onSubmit}
      >
        <FormItem
          key={"nam_1"}
          // control={control}
          name={"name"}
          label={
            <span
              style={{
                textTransform: "capitalize",
                fontWeight: 500,
              }}
            >
              name
            </span>
          }
        >
          <Input onChange={onChange} placeholder={`Type name here . . .`} />
        </FormItem>
        <button type="submit">Create</button>
      </Form>

      <br />
      <h1>List of Flower: </h1>
      {data && data.map((el) => <div key={el.id}>{el.name}</div>)}
    </div>
  );
}

export default Dashboard;
