import wrapper from "@/configureStore.js/stroe";


const App = ({Component}) => {
  return (
    <>
      <Component />
    </>
  );
}

export default wrapper.withRedux(App);