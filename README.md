# React és ASP.NET Core alapú webalkalmazás
## Témalabor 2020/21 ősz

A feladat egy teendőket kezelő webalkalmazás fejlesztése volt, amiben a teendők rendelkeznek címmel, határidővel, prioritással és leírással. A határidők helyett a sorrendjüket a hozzáadás ideje határozza meg.  A határidő és a prioritás később még változtatható.

Az alkalmazás frontendje React alapú, Visual Studio Code környezetben készítettem. A teendőket adatbázisban tárolom, ehhez REST interfészen keresztül lehet hozzáférni és a backend maga pedig ASP.NET Core alapú. Ezen kívül készítettem Unit tesztet a backend kód ellenőrzéséhez.
 
### Frontend

A frontend részének forráskódja a projekt ClientApp mappájában található. A kódot JavaScriptben írtam, és a formázó CSS file az App.css. A kiinduló komponens az index.js, ez végzi az App.js renderelését, amiben beágyazva van a TaskListContextProvider, a Header, A TaskForm és a TaskList. 
#### Komponensek:
 - **Header:** A To-do list szöveget írja ki
 - **TaskForm:** Egy task hozzáadásához található benne minden beviteli mező.
 - **TaskList:** A már hozzáadott task-okat listázza ki, azoknak minden részletét.
 - **Task:** egy teendő, tulajdonságai: ID, cím, státusz, határidő, leírás, módosítás és törlés gomb
 - **TaskListPopUp:** Ez a dialógusablak, ami felugrik, amikor a task módosításra kattintunk, a task minden részlete látható rajta. A módosítás gombra kattintva lehet módosítani a határidőt és a státuszt, ezt a Save gombra kattintva lehet elmenteni. Az ablakot bezárni a Close gombbal vagy a jobb felső sarokban lévő X-el lehet bezárni.
#### Context:
**TaskListContext:** Az alkalmazás context-je, azaz ebben van a taskok listája mint "globális" változó amihez, a *context hook* használatával hozzáfér a többi komponens is. A hook-ok használatának az az előnye, hogy nem kell teljes osztályt írni, elég függvény komponenseket.
A függvények amik még elérhetőek belőle: 
- `addTask`: új teendő felvétele
- `editTask`: teendő módosítása
- `removeTask`: id alapján teendő törlése
- `findItem`: id alapján egy teendő megkeresése
- `clearList`: az összes teendő törlése
- `dateFormat`: a paraméterként kapott dátumot formázza SQL által elfogadott formátumúra

Használt hook-ok:
- **createContext**:  ezzel hozza létre context-et ami fájl alapja
- **useEffect**: A React.Components osztály `componentDidMount` helyetti életcilus pótlására használtam, az adatbázisból az adatokat csak betöltéskor kéri le
- **useState**: a taskok tömbjének tárolásához és módosításához

#### Backend
Az ASP.NET Core projekt Main függvénye a **Program.cs** fájlban található, az IIS Express ezt indítja el futattáskor. A Main elindítja a Host-ot a **Startup.cs** segítségével, amiben a hostolt szerver beállításai szabhatóak személyre. Ebben *CORS* szabályokat adtam meg, amivel minden *CRUD* művelet (Create, Read Update, Delete) teljesíthető a szerveren.  
