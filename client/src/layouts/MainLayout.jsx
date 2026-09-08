
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout() {
return (
<div className="min-h-screen bg-slate-50 flex flex-col">

<Header />

<main className="flex-1">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<Outlet />
</div>
</main>

<Footer />

</div>
);
}

export default MainLayout;