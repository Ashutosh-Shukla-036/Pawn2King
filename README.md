# Pawn2King - A MERN Stack Application

This project is a chess application built using the MERN stack (React.js, Express.js, Node.js) with PostgreSQL as the database and Prisma as the ORM. It provides real-time multiplayer functionality using WebSockets. The application allows users to sign up, log in, and play chess games with other players in real-time.

---

## Key Features

- **User Authentication**: Secure registration, login, and account management using JWT.
- **Real-time Gameplay**: Players can join games using a unique room ID. WebSocket connections enable real-time moves and interactions.
- **Move History**: Every move made during a game is stored in the database for tracking and review.
- **Game State**: The game board state (FEN notation) is dynamically updated to ensure accurate game progression.
- **Game Status**: Tracks the game status (in-progress, finished, draw) and updates based on gameplay events like checkmate or stalemate.
- **Import Games**: Users can upload game data from other platforms for review and analysis.
- **Move Analysis**: The application provides insights into move quality, including brilliant moves, blunders, and mistakes.

---

## Architecture

- **Frontend**: React.js for the user interface, managing gameplay, user interaction, and real-time updates.
- **Backend**: Node.js and Express.js provide RESTful API endpoints for user registration, login, and game management.
- **Database**: PostgreSQL is used to store user information, game data (including moves and game state), and associated records, managed through Prisma.
- **Real-time Communication**: WebSockets are used for real-time communication between players during a chess game.

---

## Technologies Used

- **Frontend**: React.js, Recoil.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL + Prisma ORM
- **Real-time Communication**: WebSockets
- **Deployment**: Docker + Docker Compose

---

## Scalability Considerations

### 1. WebSocket Performance
- **Current Setup**: WebSocket is used to manage real-time communication between players. Each player connects through a WebSocket channel, and game state changes are broadcasted to all participants in the room.
- **Handling 50-60 Concurrent Users**: The current setup can manage this number of users effectively. However, as the user base grows:
  - Consider horizontal scaling with multiple WebSocket server instances.
  - Use a message broker (e.g., Redis Pub/Sub) to synchronize communication across instances.

---

### 2. Database Design with PostgreSQL
- **Database Schemas**:
  - **User Table**: Stores user credentials and profile details.
  - **Game Table**: Stores details of ongoing and completed games, including room IDs, players, FEN notation, and game status.
  - **Move Table**: Records each move made during a game with timestamps for analysis.
- **Optimizations**:
  - Use indexing for fields like room IDs, player IDs, and game states to speed up queries.
  - Leverage Prisma's migrations for schema evolution and ensure data consistency.
- **Move Analysis**:
  - Implemented as a service that evaluates each move after the game ends, assigning ratings (e.g., brilliant, mistake, blunder).
  - Stores insights in a separate analysis table linked to the game for efficient retrieval.

---

### 3. Future Enhancements for Scalability
- **Data Management**:
  - Archive or compress older games to reduce database load.
  - Use pagination and caching for large game or move history queries.
- **WebSocket Scaling**:
  - Deploy multiple WebSocket servers using Docker and Kubernetes for load balancing.
  - Use Redis for session persistence across WebSocket instances.
- **Database Scaling**:
  - Utilize PostgreSQL sharding for distributing data as user numbers grow.
  - Periodic database optimization tasks like vacuuming and indexing.

---

## Monitoring and Load Testing
- **Load Testing**: Use tools like Artillery or Apache JMeter to simulate real-world usage scenarios.
- **Monitoring**: Implement Prometheus and Grafana for real-time server and database monitoring, tracking metrics like CPU usage, memory, query performance, and WebSocket connections.

---