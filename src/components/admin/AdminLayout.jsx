import { LayoutDashboard, ShieldUser, Swords, LogOut } from 'lucide-react';

const tabs = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'players', label: 'Players', icon: ShieldUser },
  { key: 'matches', label: 'Matches', icon: Swords },
];

export default function AdminLayout({ activeTab, onTabChange, onLogout, children }) {
  return (
    <div className="ui-shell">
      <div className="ui-page">
        <div className="ui-grid gap-6" style={{ gridTemplateColumns: '280px minmax(0,1fr)' }}>
          <aside className="glass-card rounded-2xl p-5 h-fit sticky top-24">
            <div>
              <h1 className="text-xl font-bold text-white">Tournament Admin</h1>
              <p className="text-sm text-gray-400 mt-1">Secure management panel</p>
            </div>

            <nav className="mt-6 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => onTabChange(tab.key)}
                    className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-cyan-400/50 text-cyan-100 shadow-lg shadow-cyan-500/10'
                        : 'bg-white/10 border border-white/20 text-gray-300 hover:text-white hover:bg-white/15 hover:border-white/30'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <button
              onClick={onLogout}
              className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/50 bg-red-500/20 px-4 py-3 text-red-200 hover:bg-red-500/30 hover:border-red-500/70 transition-all shadow-lg shadow-red-500/5"
            >
              <LogOut size={16} />
              Logout
            </button>
          </aside>

          <section className="min-w-0">{children}</section>
        </div>
      </div>
    </div>
  );
}
