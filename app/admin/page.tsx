import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPage() {
  try {
    await requireAdmin();
  } catch {
    redirect("/dashboard");
  }

  const [totalUsers, totalAccounts, totalTransactions, recentUsers, recentTransactions] = await Promise.all([
    prisma.user.count(),
    prisma.propAccount.count(),
    prisma.transaction.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { id: true, name: true, email: true, role: true, balance: true, createdAt: true,
        _count: { select: { propAccounts: true } } },
    }),
    prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { id: true, amount: true, status: true, paymentMethod: true, createdAt: true,
        user: { select: { name: true, email: true } } },
    }),
  ]);

  const completedRevenue = await prisma.transaction.aggregate({
    where: { status: "COMPLETED" },
    _sum: { amount: true },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Admin Header */}
      <div className="border-b border-red-500/30 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-lg">Aquorex</span>
            <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-xs font-bold">ADMIN</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-400 text-sm hover:text-white">Site</Link>
            <Link href="/api/auth/signout" className="text-sm text-red-400 hover:text-red-300">Chiqish</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-black mb-2">Admin Panel 🛡️</h1>
        <p className="text-gray-400 mb-8">Barcha ma'lumotlar real vaqtda</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Jami Foydalanuvchilar", value: totalUsers, color: "cyan" },
            { label: "Prop Accountlar", value: totalAccounts, color: "blue" },
            { label: "Jami Tranzaksiyalar", value: totalTransactions, color: "purple" },
            { label: "Jami Daromad", value: `$${Number(completedRevenue._sum.amount || 0).toLocaleString()}`, color: "green" },
          ].map((stat, i) => (
            <div key={i} className={`rounded-xl border border-${stat.color}-500/30 bg-${stat.color}-500/10 p-5`}>
              <div className="text-gray-400 text-xs mb-1">{stat.label}</div>
              <div className={`text-2xl font-black text-${stat.color}-400`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Users Table */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">So'nggi Foydalanuvchilar</h2>
          <div className="rounded-xl border border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-800">
                <tr>
                  <th className="text-left p-4 text-gray-400">Ism</th>
                  <th className="text-left p-4 text-gray-400">Email</th>
                  <th className="text-left p-4 text-gray-400">Role</th>
                  <th className="text-left p-4 text-gray-400">Accountlar</th>
                  <th className="text-left p-4 text-gray-400">Sana</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map(user => (
                  <tr key={user.id} className="border-t border-slate-700 hover:bg-slate-800/50">
                    <td className="p-4 font-medium">{user.name || "—"}</td>
                    <td className="p-4 text-gray-400">{user.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        user.role === "ADMIN" ? "bg-red-500/20 text-red-400" : "bg-slate-700 text-gray-300"
                      }`}>{user.role}</span>
                    </td>
                    <td className="p-4 text-cyan-400 font-bold">{user._count.propAccounts}</td>
                    <td className="p-4 text-gray-400">{new Date(user.createdAt).toLocaleDateString("uz-UZ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transactions Table */}
        <div>
          <h2 className="text-xl font-bold mb-4">So'nggi Tranzaksiyalar</h2>
          <div className="rounded-xl border border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-800">
                <tr>
                  <th className="text-left p-4 text-gray-400">Foydalanuvchi</th>
                  <th className="text-left p-4 text-gray-400">Summa</th>
                  <th className="text-left p-4 text-gray-400">Usul</th>
                  <th className="text-left p-4 text-gray-400">Holat</th>
                  <th className="text-left p-4 text-gray-400">Sana</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map(t => (
                  <tr key={t.id} className="border-t border-slate-700 hover:bg-slate-800/50">
                    <td className="p-4">
                      <div className="font-medium">{t.user.name || "—"}</div>
                      <div className="text-gray-500 text-xs">{t.user.email}</div>
                    </td>
                    <td className="p-4 font-bold">{Number(t.amount).toLocaleString()} UZS</td>
                    <td className="p-4">{t.paymentMethod}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        t.status === "COMPLETED" ? "bg-green-500/20 text-green-400" :
                        t.status === "PENDING" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>{t.status}</span>
                    </td>
                    <td className="p-4 text-gray-400">{new Date(t.createdAt).toLocaleDateString("uz-UZ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}