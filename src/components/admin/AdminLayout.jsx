import { LayoutDashboard, ShieldUser, Swords, LogOut } from 'lucide-react';

const tabs = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'players', label: 'Players', icon: ShieldUser },
  { key: 'matches', label: 'Matches', icon: Swords },
];

export default function AdminLayout({ activeTab, onTabChange, onLogout, children }) {
  return (
    <div className="ui-page mt-10">
      <div className="ui-grid gap-6" style={{ gridTemplateColumns: '280px minmax(0,1fr)' }}>
        <aside className="ui-card h-fit sticky top-6">
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
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-white'
                      : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
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
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300 hover:bg-red-500/20 transition-all"
          >
            <LogOut size={16} />
            Logout
          </button>
        </aside>

        <section className="min-w-0">{children}</section>
      </div>
    </div>
  );
}
