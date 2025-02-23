# 角色管理系统

该项目是一个角色管理系统，旨在帮助用户有效地管理应用程序中的角色和权限。用户可以通过该系统创建、编辑和删除角色，并为每个角色分配相应的权限，从而实现对用户访问控制的管理。

## 技术栈

### 前端

- **Vue 3**：使用 Vue 3 框架构建用户界面，利用其响应式特性和组件化开发方式，提高开发效率和用户体验。
- **Vite**：作为构建工具，Vite 提供了快速的开发环境和热重载功能，提升了开发效率。
- **Ant Design Vue**：使用 Ant Design Vue 组件库，提供美观且易用的 UI 组件，增强用户界面的可用性和美观性。

### 后端

- **Node.js**：后端使用 Node.js 作为服务器环境，提供高效的异步处理能力。
- **Express**：使用 Express 框架构建 RESTful API，处理前端请求并与数据库进行交互。
- **数据库**：可以使用 MongoDB、MySQL 或其他数据库来存储角色和权限数据，具体取决于项目需求。

## 架构

该项目采用前后端分离的架构，前端通过 API 与后端进行数据交互。前端负责用户界面的展示和用户交互，后端负责数据的处理和存储。具体架构如下：

1. **前端**：
   - 用户通过浏览器访问前端应用，前端应用使用 Vue 3 和 Vite 构建。
   - 前端通过 Axios 或 Fetch API 向后端发送请求，获取角色和权限数据。

2. **后端**：
   - 后端使用 Node.js 和 Express 构建 RESTful API，处理来自前端的请求。
   - 后端与数据库进行交互，执行 CRUD 操作以管理角色和权限数据。

3. **数据流**：
   - 用户在前端界面进行操作（如添加角色、分配权限等）。
   - 前端将请求发送到后端 API。
   - 后端处理请求，进行相应的数据库操作，并将结果返回给前端。
   - 前端根据后端返回的数据更新用户界面。

## 推荐的 IDE 设置

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## 项目设置

1. 克隆仓库：
   ```bash
   git clone <repository-url>
   ```

2. 安装依赖：
   ```bash
   pnpm install
   ```

3. 启动开发服务器：
   ```bash
   pnpm run dev
   ```

4. 打开浏览器并访问 `http://localhost:3000`。

## API 端点

- **GET /api/roles**：获取所有角色。
- **POST /api/roles**：创建新角色。
- **PUT /api/roles/:id**：更新现有角色。
- **DELETE /api/roles/:id**：删除角色。

## 贡献

欢迎贡献！请随时提交拉取请求或打开问题。

## 许可证

该项目遵循 MIT 许可证。