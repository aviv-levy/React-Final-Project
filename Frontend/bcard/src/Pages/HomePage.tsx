import Card from '../Components/Card';


function HomePage() {
    
    return (
        <>
            <div className="contianer-fluid mx-3 my-4">
                <h1>Cards Page</h1>
                <h4>Here you can find business cards from all categories</h4>
                <hr />
            </div>
            <div className='d-flex justify-content-center mb-4'>
                <div className="row row-cols-1 row-cols-md-4 container-fluid g-4">

                    <Card
                        title='Cyber security'
                        date='15/09/2023'
                        phone='054-4589945'
                        address='Hahluzim 56 Holon'
                        cardId={159845}
                        img='https://www.chitkara.edu.in/blogs/wp-content/uploads/2022/05/Cyber-Security.jpg'
                    />

                    <Card
                        title='Hacker'
                        date='12/05/2023'
                        phone='054-4589945'
                        address='Lulav 31 Bat-Yam'
                        cardId={45568}
                        img='https://etimg.etb2bimg.com/photo/78187983.cms'
                    />



                </div>
            </div>
        </>
    );
}

export default HomePage;