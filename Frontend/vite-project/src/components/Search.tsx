import React, { useState, ChangeEvent } from 'react';

// Post 데이터 타입 정의(서버에서 받을 데이터타입)
interface Post {
  _id: string;
  title: string;
}
// PostSearch 컴포넌트
const PostSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // 입력한 텍스트 저장
  const [posts, setPosts] = useState<Post[]>([]); //서버에서 받은 검색결과 저장
//검색 API 호출 함수
  const handleSearch = async (query: string): Promise<void> => {
    try {
        //fetch: 데이터 요청
      const response = await fetch(`http://localhost:3000/posts/search?query=${query}`);
        //성공 여부 확인
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Post[] = await response.json();
      setPosts(data); //json 형식, setpost로 data 상태에 저장
    } catch (error) {
      console.error('Error fetching posts:', error); //네트워크 오류시 오류메세지
    }
  };
 // 텍스트 입력 함수
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value; //입력값 가져오기
    setSearchQuery(value); //검색어 상태 업데이트
    handleSearch(value); //검색 실행
  };

  return (
    <div>
      <input //검색창
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      {/* posts 순회해서 각 post title li로 랜더링, key 속성으로 _id를 사용해 각 항목 구분*/}
      <ul>
        {posts.map((post) => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostSearch;