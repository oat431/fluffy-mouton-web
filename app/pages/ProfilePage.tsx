import { useNavigate } from "react-router";
import MainLayout from "../layouts/Section.tsx";
import { useAuth } from "../context/AuthContext.tsx";

export default function ProfilePage() {
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <MainLayout>
            <div className="card bg-base-100 shadow-xl border border-base-300 w-full max-w-lg mx-auto mt-8">
                <div className="card-body gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="card-title text-2xl">My Profile</h2>
                        <button
                            className="btn btn-error btn-sm"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-3 py-4">
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content w-20 rounded-full text-3xl font-bold">
                                <span>👤</span>
                            </div>
                        </div>
                        <p className="text-base-content/60 text-sm">
                            Signed in via Flowero Guard. Your account is managed centrally.
                        </p>
                    </div>

                    <div className="divider my-0"></div>

                    <div className="text-sm text-base-content/60 space-y-2">
                        <p>🔐 <strong>Authentication:</strong> OAuth2 / Keycloak</p>
                        <p>🔄 <strong>Session:</strong> Managed by Flowero Gate</p>
                        <p>🔑 <strong>Password & Email:</strong> Managed at the central login</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
