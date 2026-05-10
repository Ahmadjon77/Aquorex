import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getAuthSession();
  if (!session?.user?.id) redirect("/auth/login");

  // Admin bo'lsa admin panelga
  if (session.user.role === "ADMIN") redirect("/admin");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      image: true,
      balance: true,
      createdAt: true,
      propAccounts: {
        orderBy: { createdAt: "desc" },
        select: { id: true, accountSize: true, challengeType: true, status: true, currentBalance: true, createdAt: true },
      },
      transactions: {
        orderBy: { createdAt: "desc" },
        take: 10,
        select: { id: true, amount: true, status: true, paymentMethod: true, createdAt: true },
      },
    },
  });

  if (!user) redirect("/auth/login");

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-500/20 text-yellow-400",
    ACTIVE: "bg-green-500/20 text-green-400",
    PASSED: "bg-blue-500/20 text-blue-400",
    FAILED: "bg-red-500/20 text-red-400",
    FUNDED: "bg-cyan-500/20 text-cyan-400",
  };

  const sizeLabels: Record<string, string> = {
    SIZE_5K: "$5,000", SIZE_10K: "$10,000", SIZE_25K: "$25,000",
    SIZE_50K: "$50,000", SIZE_100K: "$100,000",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="font-bold text-lg">Aquorex</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">{user.email}</span>
            <Link href="/api/auth/signout" className="text-sm text-red-400 hover:text-red-300">Chiqish</Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-1">Xush kelibsiz, {user.name?.split(" ")[0]}! 👋</h1>
          <p className="text-gray-400">Trader Dashboard</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6">
            <div className="text-gray-400 text-sm mb-1">Balans</div>
            <div className="text-2xl font-black text-cyan-400">${Number(user.balance).toLocaleString()}</div>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
            <div className="text-gray-400 text-sm mb-1">Prop Accountlar</div>
            <div className="text-2xl font-black">{user.propAccounts.length}</div>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
            <div className="text-gray-400 text-sm mb-1">Faol Challengelar</div>
            <div className="text-2xl font-black text-green-400">
              {user.propAccounts.filter(a => a.status === "ACTIVE").length}
            </div>
          </div>
        </div>

        {/* Prop Accounts */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Mening Accountlarim</h2>
            <Link href="/#programs" className="text-cyan-400 text-sm hover:underline">+ Yangi account</Link>
          </div>
          {user.propAccounts.length === 0 ? (
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-10 text-center">
              <div className="text-4xl mb-3">📊</div>
              <p className="text-gray-400 mb-4">Hali account sotib olinmagan</p>
              <Link href="/" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full text-sm font-bold">
                Challenge boshlash
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {user.propAccounts.map(account => (
                <div key={account.id} className="rounded-xl border border-slate-700 bg-slate-900 p-5 flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <div className="font-bold text-lg">{sizeLabels[account.accountSize]} — {account.challengeType}</div>
                    <div className="text-gray-400 text-sm">{new Date(account.createdAt).toLocaleDateString("uz-UZ")}</div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[account.status]}`}>
                      {account.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Transactions */}
        <div>
          <h2 className="text-xl font-bold mb-4">So'nggi To'lovlar</h2>
          <div className="rounded-xl border border-slate-700 overflow-hidden">
            {user.transactions.length === 0 ? (
              <div className="p-8 text-center text-gray-400">Hali to'lov amalga oshirilmagan</div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="text-left p-4 text-gray-400">Sana</th>
                    <th className="text-left p-4 text-gray-400">Summa</th>
                    <th className="text-left p-4 text-gray-400">Usul</th>
                    <th className="text-left p-4 text-gray-400">Holat</th>
                  </tr>
                </thead>
                <tbody>
                  {user.transactions.map(t => (
                    <tr key={t.id} className="border-t border-slate-700">
                      <td className="p-4 text-gray-400">{new Date(t.createdAt).toLocaleDateString("uz-UZ")}</td>
                      <td className="p-4 font-bold">{Number(t.amount).toLocaleString()} UZS</td>
                      <td className="p-4">{t.paymentMethod}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          t.status === "COMPLETED" ? "bg-green-500/20 text-green-400" :
                          t.status === "PENDING" ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-red-500/20 text-red-400"
                        }`}>{t.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}