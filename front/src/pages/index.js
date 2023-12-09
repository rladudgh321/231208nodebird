import AppLayout from "@/components/AppLayout";
import PostForm from '@/components/PostForm';
import PostCard from '@/components/PostCard';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { POSTS_REQUEST } from "@/reducer/post";



const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPost, hasmorePosts, postsLoading } = useSelector((state) => state.post);
  useEffect(()=>{ //로딩 했을 때 불러오기
    dispatch({
      type:POSTS_REQUEST,
    });
  },[dispatch]);
  useEffect(()=>{ // 스크롤 내릴 때 불러오기
    function onScroll() {
      if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500) {
        if(hasmorePosts && !postsLoading) {
          dispatch({
            type:POSTS_REQUEST,
          })
        }      
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
    
  },[dispatch, hasmorePosts, postsLoading]);
  return (
    <>
      <AppLayout>
        { me && <PostForm /> }
        { mainPost.map((v) => ( <PostCard key={v.id} post={v} /> ))}
      </AppLayout>
    </>
  );
}

export default Home;